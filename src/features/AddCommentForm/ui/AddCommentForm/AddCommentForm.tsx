import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  ReducersMap,
  useDynamicModuleLoader,
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { HStack } from "@/shared/ui/Stack";

import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../model/slices/addCommentFormSlice";
import cls from "./AddCommentForm.module.scss";

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
  props: AddCommentFormProps
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
    [dispatch]
  );

  const onSendCommentClick = useCallback(() => {
    onSendComment(text || "");
    onCommentTextChange("");
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <HStack
      max
      justify="between"
      align="center"
      className={classNames(cls.addCommentForm, {}, [className])}
      data-testid="AddCommentForm"
    >
      <Input
        className={cls.input}
        placeholder={t("Enter comment text")}
        value={text}
        onChange={onCommentTextChange}
        data-testid="AddCommentForm.Input"
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onSendCommentClick}
        data-testid="AddCommentForm.Button"
      >
        {t("Send")}
      </Button>
    </HStack>
  );
});

export default AddCommentForm;
