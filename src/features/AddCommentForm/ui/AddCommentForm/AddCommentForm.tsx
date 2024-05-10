import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  ReducersMap,
  useDynamicModuleLoader,
} from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';

import {
  getAddCommentFormError,
  getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const initialReducers: ReducersMap = {
  addCommentForm: addCommentFormReducer,
};

const dynamicModuleLoaderProps = {
  reducers: initialReducers,
};

const AddCommentForm = memo(function AddCommentForm(
  props: AddCommentFormProps,
) {
  const { className, onSendComment } = props;

  const dispatch = useAppDispatch();
  useDynamicModuleLoader(dynamicModuleLoaderProps);
  const { t } = useTranslation();

  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const onSendCommentClick = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card padding="24" border="partial" max>
          <HStack
            max
            justify="between"
            align="center"
            className={classNames(cls.addCommentFormRedesigned, {}, [
              className,
            ])}
            data-testid="AddCommentForm"
            gap="16"
          >
            <Input
              className={cls.input}
              placeholder={t('Enter comment text')}
              value={text}
              onChange={onCommentTextChange}
              data-testid="AddCommentForm.Input"
            />
            <Button
              variant="outline"
              onClick={onSendCommentClick}
              data-testid="AddCommentForm.Button"
            >
              {t('Send')}
            </Button>
          </HStack>
        </Card>
      }
      off={
        <HStack
          max
          justify="between"
          align="center"
          className={classNames(cls.addCommentForm, {}, [className])}
          data-testid="AddCommentForm"
        >
          <InputDeprecated
            className={cls.input}
            placeholder={t('Enter comment text')}
            value={text}
            onChange={onCommentTextChange}
            data-testid="AddCommentForm.Input"
          />
          <ButtonDeprecated
            theme={ButtonTheme.OUTLINE}
            onClick={onSendCommentClick}
            data-testid="AddCommentForm.Button"
          >
            {t('Send')}
          </ButtonDeprecated>
        </HStack>
      }
    />
  );
});

export default AddCommentForm;
