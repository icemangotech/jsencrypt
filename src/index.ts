import JSEncrypt from "./JSEncrypt";
if (typeof window != "undefined") {
  (window as any).JSEncrypt = JSEncrypt;
}
export { JSEncrypt };
export default JSEncrypt;
