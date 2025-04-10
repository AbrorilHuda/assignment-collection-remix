import { Alert } from "@heroui/react";
import alertType from "~/lib/types/alertype";

export default function MyAlert(props: alertType) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col w-full">
        <div className="w-full flex items-center my-3  bg-orange-400">
          <Alert
            color={props.color}
            className={!props.hide ? "hidden" : ""}
            title={props.message}
          />
        </div>
      </div>
    </div>
  );
}
