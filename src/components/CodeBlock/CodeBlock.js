import React, { useEffect, useRef } from 'react';
import * as Prism from 'prismjs';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {}
}));

const trimCode = input => {
  const codeLines = input.split('\n');

  if (!codeLines[0].trim()) {
    codeLines.shift();
  }

  if (!codeLines[codeLines.length - 1].trim()) {
    codeLines.pop();
  }

  const indexOfFirstChar = codeLines[0].search(/\S|$/);

  let output = '';

  codeLines.forEach((line, index) => {
    output = output + line.substr(indexOfFirstChar, line.length);

    if (index !== codeLines.length - 1) {
      output = output + '\n';
    }
  });

  return output;
};

const CodeBlock = props => {
  const {
    async,
    source,
    language,
    className,
    component: Component,
    ...rest
  } = props;

  const ref = useRef(null);
  const {classes} = useStyles();

  useEffect(() => {
    const highlight = () => {
      Prism.highlightElement(ref.current, async);
    };

    highlight();
  });

  return (
    <pre className={`language-${language}`}>
      <Component
        {...rest}
        className={clsx(classes.root, className)}
        ref={ref}
      >
        {trimCode(source)}
      </Component>
    </pre>
  );
};

CodeBlock.propTypes = {
  async: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.node,
  language: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired
};

CodeBlock.defaultProps = {
  component: 'code'
};

export default CodeBlock;
