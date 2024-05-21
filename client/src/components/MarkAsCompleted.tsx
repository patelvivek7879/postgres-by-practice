import { useProgressContext } from "@/providers/ProgressProvider";
import { Checkbox, Row, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { useEffect, useState } from "react";

const MarkAsCompleted = ({ id, isMarkedCompleted }: any) => {
  const [isMarked, setIsMarked] = useState(false);
  const { moduleProgress, updateModuleProgress }: any = useProgressContext();

  useEffect(() => {
    setIsMarked((prev: boolean) => {
      return moduleProgress?.[id] ? true : false;
    });
  }, [isMarkedCompleted]);

  const updateCurrentModuleStatus = async (e: CheckboxChangeEvent) => {

    const isChecked = e.target.checked;
    setIsMarked(isChecked);

    const status = isChecked ? 1 : 0;
    const moduleNameKey = id;

    const data = {
      status: status,
      moduleName: moduleNameKey,
    };

    try {
      // updating a single module status
      updateModuleProgress(data);
    } catch (err) {
      setIsMarked(false);
      console.log("Error while marking updatation", err);
    }
  };

  return (
    <div>
      <Row justify={"end"} align={"middle"}>
        <Space size={3} align="center">
          <Checkbox
            checked={isMarked}
            onClick={(e)=> e.stopPropagation()}
            onChange={(e) => updateCurrentModuleStatus(e)}
          />
          <small>{"mark as completed"}</small>
        </Space>
      </Row>
    </div>
  );
};

export default MarkAsCompleted;
