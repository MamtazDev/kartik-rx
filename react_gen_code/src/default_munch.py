import re
from munch import DefaultMunch

class DefaultMunchRx(DefaultMunch):
    def jinja2Str(self):
        # # '_' is only used for python related variables
        # display_dict = {key:val for key,val in self.items() if '_' not in key}
        return_str = self.toJSON()
        return_str.replace("\"date\"", "date")
        return_str = re.sub(pattern=r'\"([a-zA-Z\.]+Fn)\"', repl='\\1', string=return_str)
        return_str = return_str.replace('\"', "'")

        return return_str
