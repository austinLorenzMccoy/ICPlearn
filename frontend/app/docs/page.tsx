"use client";

import APIReference from "@/components/Docs/APIReference";
import CoreConcepts from "@/components/Docs/CoreConcepts";
import EducationalCourses from "@/components/Docs/EducationalCourses";
import FAQ from "@/components/Docs/FAQ";
import GettingStarted from "@/components/Docs/GettingStarted";
import Introduction from "@/components/Docs/Introduction";
import StakingPools from "@/components/Docs/StakingPools";



export default function DocumentationPage() {
    return (
        <>
            <Introduction />
            <GettingStarted />
            <CoreConcepts />
            <StakingPools />
            <EducationalCourses />
            <APIReference />
            <FAQ />
        </>
    );
}