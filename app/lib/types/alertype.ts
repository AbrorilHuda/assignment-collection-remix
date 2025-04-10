type alertType = {
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  message?: string;
  hide: boolean;
};

export default alertType;
