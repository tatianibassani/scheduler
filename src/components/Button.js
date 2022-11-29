import React from "react";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";
 
   if (props.confirm) {
     buttonClass += " button--confirm";
   }
 
   if (props.danger) {
     buttonClass += " button--danger";
   }
 
   return (
     <button
       className={buttonClass}
       //Add an onClick and a disabled prop to the Button component.
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }







//export default function Button(props) {
   //return <></>;
//}

