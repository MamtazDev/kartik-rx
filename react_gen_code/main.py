import argparse
import time
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, PackageLoader, select_autoescape
from src import yaml_to_js
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("main")


def parse_args() -> argparse.Namespace:
    # Initialize parser
    parser = argparse.ArgumentParser()

    # Adding arguments
    parser.add_argument(
        "-b", "--base", type=Path, help="Base react content directory.", required=True
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Output directory, where to write the content.",
        required=True,
    )
    parser.add_argument(
        "-y",
        "--yamlbase",
        type=Path,
        help="Path to all yaml files.",
        default="../page_yamls",
    )
    # parser.add_argument(
    #     "-p",
    #     "--pagename",
    #     type=str,
    #     help="Page to compile the data for.",
    #     required=True,
    # )

    # Read arguments from command line
    return parser.parse_args()


class OnFileUpdateHandler(FileSystemEventHandler):
    """Logs all the events captured."""
    env: Environment
    yamlbase: Path
    output_path: Path

    def on_modified(self, event):
        super(OnFileUpdateHandler, self).on_modified(event)

        # what = 'directory' if event.is_directory else 'file'
        # logger.info(f"Modified {what}: {event.src_path}")
        if "/routes.yaml" in event.src_path:
            logger.info("Skipping template generation of %s", event.src_path)
            return

        try:
            logger.info("Template generation of %s", event.src_path)
            yaml_to_js.compile_js(output_path=self.output_path, yaml_base=self.yamlbase, page_yaml=Path(event.src_path), jenv=env)
        except Exception as inst:
            logger.error("Exception occured: %s", inst)



if __name__ == "__main__":
    args = parse_args()
    # yaml_path = args.yamlbase / args.pagename
    # assert yaml_path.exists(), f"{yaml_path} template not present."

    env = Environment(
        loader=FileSystemLoader( searchpath=str(args.base) )
        # loader=PackageLoader("react_gen_code"),
        # autoescape=select_autoescape()
    )

    event_handler = OnFileUpdateHandler()
    event_handler.env = env
    event_handler.yamlbase = args.yamlbase
    event_handler.output_path = args.output
    observer = Observer()
    observer.schedule(event_handler, event_handler.yamlbase, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
