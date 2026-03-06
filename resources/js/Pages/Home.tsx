import React, { useState } from "react";
import HomeSlider from "@/src/Pages/Home/HomeSlider";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { usePage } from "@inertiajs/react";
import {
  AboutSection,
  BeforeAfter,
  FAQProduct,
  HeroSection,
  HomePageSection,
  HomeSection,
  OurProcess,
  PriceList,
  PromoFileSection,
  SEOHead,
  WhyWeSection,
} from "@/src/components";
import { IProduct } from "@/src/types/ProductModel";
import ProductShowModal from "@/Modals/ProductShowModal";

interface Props {
  title: string;
}

const questions: {
  question: string;
  answer: string;
}[] = [
  {
    question: "What does Signs7 do for my sign and graphics projects?",
    answer:
      "Signs7 manages your project from A to Z — including logistics, scheduling, installer coordination, vendor communication, budgeting oversight, and onsite installation support. Our goal is to take the operational burden off your team so you can stay focused on sales and production while we manage execution.",
  },
  {
    question: "What types of projects does Signs7 help with?",
    answer:
      "We support a wide range of graphics and signage projects, including interior and exterior signage, wall, window, and architectural graphics, retail roll-outs and rebrands, event and seasonal installations, as well as large-format and multi-location projects. Whether it's one site or hundreds, our process ensures consistency and control across every installation.",
  },
  {
    question: "What problems does Signs7 help solve for customers?",
    answer:
      "Many customers struggle with managing multiple installers, vendors, and schedules, project delays and communication breakdowns, budget overruns, missed details, and lost time coordinating logistics instead of selling. We step in as your project guide and operations partner — creating structure, clarity, and predictable outcomes.",
  },
  {
    question: "How does the Signs7 project process work?",
    answer:
      "Our proven 3-step process keeps projects organized and on track: Initial Consultation — we review your scope, goals, files, and site conditions. Customized Project Plan — you receive a logistics roadmap with budget, timeline, milestones, and open questions. Execution & Installation — we manage scheduling, communication, installers, and final delivery until the project is complete.",
  },
  {
    question: "What communication can I expect during my project?",
    answer:
      "Every project includes a structured logistics sheet, status updates at key milestones, centralized project communication, budget tracking and documentation, and photos with completion reporting when requested. You’ll always know what’s been done, what’s next, and who is responsible.",
  },
  {
    question: "Do you work with my existing installers or provide your own?",
    answer:
      "We can work with your preferred vendors, provide our vetted professional installation teams, or operate in a hybrid model. Our focus is ensuring the right crew is assigned and coordinated for each site and scope.",
  },
  {
    question: "What are the benefits of working with Signs7?",
    answer:
      "Customers choose Signs7 because we help them save time and reduce project stress, avoid costly mistakes and re-installs, maintain consistency across locations, keep communication centralized and organized, and focus on growth instead of micromanaging logistics. With the right team, even large projects become simple and predictable.",
  },
  {
    question: "What happens if an issue comes up during installation?",
    answer:
      "If something unexpected occurs, our team manages the resolution from start to finish — coordinating communication, installers, timelines, and corrective actions so you’re never left without support.",
  },
  {
    question: "How do I start a project with Signs7?",
    answer:
      "Submit your project details through our request form or contact our team for a consultation. We’ll review your scope and provide a tailored project plan and timeline.",
  },
];

const Home: React.FC<Props> = ({ title }: Props) => {
  const { homeCategories } = usePage<SharedInertiaData>().props;
  const [product, setProduct] = useState<IProduct>();

  return (
    <>
      {!product ? (
        <SEOHead title={title} />
      ) : (
        <SEOHead
          title={product.seo_title}
          description={product.seo_desc}
          keywords={product.seo_keywords}
        />
      )}

      {product ? (
        <ProductShowModal
          product={product}
          handleClose={() => setProduct(undefined)}
        />
      ) : null}

      <div className="ps-home ps-home--4">
        {/* <section className="ps-section--banner"> */}
        {/* <HomeSlider /> */}
        {/* </section> */}

        <HeroSection productWithCategories={homeCategories} />

        <AboutSection />

        <PriceList productWithCategories={homeCategories} />

        <OurProcess />

        <WhyWeSection />

        <BeforeAfter />

        <PromoFileSection />

        <HomePageSection>
          <HomePageSection.Title
            title="Sign Installation Questions"
            description="Expert guidance from a professional sign installation company serving projects across the country."
          />

          <div className="container">
            <div className="col-md-12">
              <FAQProduct questions={questions} />
            </div>
          </div>
        </HomePageSection>

        {/* {homeCategories.map((category, idx) => {
          return (
            <HomeSection
              key={category.id}
              title={category.title}
              titleUrl={`/shop/${category.slug}`}
              products={category.products}
              primaryColor={category.colors.primary}
              altColor={category.colors.alternative}
            />
          );
        })} */}
      </div>
    </>
  );
};

export default Home;
