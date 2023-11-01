export const metadata = {
    title: "Home - Simple",
    description: "Page description",
};

// import Hero from "@/components/hero";
import Sidebar from "@/components/chat/sidebar";
import MainChat from "@/components/chat/mainChat";
// import Features from "@/components/features";
// import FeaturesBlocks from "@/components/features-blocks";
// import Testimonials from "@/components/testimonials";
// import Newsletter from "@/components/newsletter";

export default function Home() {
    return (
        <>
            {/* <Sidebar /> */}
            <MainChat />
            {/* <Hero />
            <Features />
            <FeaturesBlocks />
            <Testimonials />
            <Newsletter /> */}
        </>
    );
}
