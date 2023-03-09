import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReducersMap, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
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

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const {
    className,
    onSendComment,
  } = props;

  const dispatch = useAppDispatch();
  useDynamicModuleLoader(dynamicModuleLoaderProps);
  const { t } = useTranslation();

  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendCommentClick = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <div className={classNames(cls.addCommentForm, {}, [className])}>
      <Input
        className={cls.input}
        placeholder={t('Enter comment text')}
        value={text}
        onChange={onCommentTextChange}
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onSendCommentClick}
      >
        {t('Send')}
      </Button>
    </div>
  );
});

export default AddCommentForm;
