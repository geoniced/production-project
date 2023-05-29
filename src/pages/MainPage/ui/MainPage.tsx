import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { HStack } from "shared/ui/Stack";

const MainPage = memo(() => {
  const { t } = useTranslation("main");
  return (
    <Page>
      {t("Main page")}
      {/* <div>Text</div> */}
      {/* <div>Text</div> */}
      {/* <div>Text</div> */}
      {/* <div>Text</div> */}
      {/* <HStack> */}
      {/*  <div>Label</div> */}
      {/*  <ListBox */}
      {/*    value={undefined} */}
      {/*    defaultValue="Выберите значение" */}
      {/*    onChange={(value: string) => {}} */}
      {/*    items={[ */}
      {/*      { */}
      {/*        value: "1", */}
      {/*        content: "First value", */}
      {/*      }, */}
      {/*      { */}
      {/*        value: "2", */}
      {/*        content: "Second value", */}
      {/*      }, */}
      {/*      { */}
      {/*        value: "3", */}
      {/*        content: "Third value", */}
      {/*        disabled: true, */}
      {/*      }, */}
      {/*      { */}
      {/*        value: "4", */}
      {/*        content: "Fourth value", */}
      {/*      }, */}
      {/*    ]} */}
      {/*  /> */}
      {/* </HStack> */}
      {/* <div>Text</div> */}
      {/* <div>Text</div> */}
      {/* <div>Text</div> */}
    </Page>
  );
});

export default MainPage;
