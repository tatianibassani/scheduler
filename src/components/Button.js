import React from "react";

import "components/Button.scss";

import classNames from "classnames";

export default function Button(props) {
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });
    
      
/*   let buttonClass = classNames("button");
 
   if (props.confirm) {
     buttonClass = classNames("button", "button--confirm");
   }
 
   if (props.danger) {
     buttonClass = classNames("button", "button--danger");
   }*/
 
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

