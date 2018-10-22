import React from "react";
import PageHeader from "../components/page-header";
import PageContent from "../components/page-content";
import AboutContent from "../components/about-content";

export default function About() {
    return (
        <PageContent>
            <PageHeader text='About Me' emoji='👨🏼‍💻' />
            <AboutContent />
        </PageContent>
    );
};