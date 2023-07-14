import React from "react";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

export default function HomeLayout(props) {
    return(
        <>
        <div className="custom">
            <HomeHeader/>
            {props.children}
            <HomeFooter/>
        </div>
        </>
    )
}