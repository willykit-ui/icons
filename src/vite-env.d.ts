/// <reference types="vite/client" />
declare module "*.svg";
declare module "*.svg?react";
declare module "*.svg" {
    const content: string;
    export default content;
}
