import { memo, useCallback } from 'react';

import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import { Icon } from '../Icon';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo(function Code(props: CodeProps) {
  const { className, text } = props;

  const onCopyClick = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <pre className={classNames(cls.codeRedesigned, {}, [className])}>
          <Icon
            Svg={CopyIconNew}
            onClick={onCopyClick}
            clickable
            className={cls.copyBtn}
          />
          <code>{text}</code>
        </pre>
      }
      off={
        <pre className={classNames(cls.code, {}, [className])}>
          <Button
            onClick={onCopyClick}
            className={cls.copyBtn}
            theme={ButtonTheme.CLEAR}
          >
            <CopyIcon className={cls.copyIcon} />
          </Button>
          <code>{text}</code>
        </pre>
      }
    />
  );
});