import React from "react";

export default function Detail(props) {
  return (
    <div style={{ padding: 10, background: "#fff" }}>
      ID : {props.user && props.user.id} <br />
      Name : {props.user && props.user.name} <br />
      Gender : {props.user && props.user.gender} <br />
      Name : {props.user && props.user.name} <br />
      Name : {props.user && props.user.name} <br />
      Name : {props.user && props.user.name} <br />
      Name : {props.user && props.user.name} <br />
    </div>
  );
}
