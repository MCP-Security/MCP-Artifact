import { HeroSection } from "@/components/HeroSection";
import { HomepageTabs } from "@/components/HomepageTabs"; // Import the new HomepageTabs component
import { FeaturedServersSection } from "@/components/FeaturedServersSection";
import { FeaturedClientsSection } from "@/components/FeaturedClientsSection";
import { FAQSection } from "@/components/FAQSection";

export default function Home() {
    return (
        <>
            {/* HeroSection for homepage */}
            <HeroSection />
            <HomepageTabs /> {/* Replace ServersTabs with HomepageTabs */}
            <FeaturedServersSection />
            {/* <FeaturedClientsSection /> */}
            <FAQSection />
        </>
    );
}
