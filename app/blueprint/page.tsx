import React from "react";

const page = () => {
    return (
        // display a website in fullscreeen on the iframe
        <section className="w-screen h-screen m-0 p-0 box-border">
            <iframe
                src="https://furnishup.github.io/blueprint3d/example/"
                title=""
                width={"100%"}
                height={"100%"}
            ></iframe>
        </section>
    );
};

export default page;
