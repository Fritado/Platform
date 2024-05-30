import BlogPosts from "../HelpCenter/selfService/Features/BlogPosts";
import CodeChanges from "../HelpCenter/selfService/Features/CodeChanges";
import Keyword from "../HelpCenter/selfService/Features/Keyword";
import OverviewPage from "../HelpCenter/selfService/Features/OverviewPage";
import FritadoOverviewPg1 from "../HelpCenter/selfService/Fritado-Overview/FritadoOverviewPg1";
import FritadoOverviewPg2 from "../HelpCenter/selfService/Fritado-Overview/FritadoOverviewPg2";
import FritadoOverviewPg3 from "../HelpCenter/selfService/Fritado-Overview/FritadoOverviewPg3";
import FritadoOverviewPg4 from "../HelpCenter/selfService/Fritado-Overview/FritadoOverviewPg4";
import GSInstruction from "../HelpCenter/selfService/GettingStarted/GSInstruction";
import GSOnboarding from "../HelpCenter/selfService/GettingStarted/GSOnboarding";
import GSSettingUp from "../HelpCenter/selfService/GettingStarted/GSSettingUp";
import GSTroubleshooting from "../HelpCenter/selfService/GettingStarted/GSTroubleshooting";
import GSWebTroubleShooting from "../HelpCenter/selfService/GettingStarted/GSWebTroubleShooting";
import FritadoPro from "../HelpCenter/selfService/Fritadopro/FritadoPro";
import SettingPage from "../HelpCenter/selfService/GeneralResources/SettingPage";
import WebsiteProvider from "../HelpCenter/selfService/GeneralResources/WebsiteProvider";
import SEOBasics from "../HelpCenter/selfService/GeneralResources/SEOBasics";
import SystemRequirements from "../HelpCenter/selfService/GeneralResources/SystemRequirements";
import ProductUpdate from "../HelpCenter/selfService/GeneralResources/ProductUpdate";

export const FritadoOverView = [
  {
    id: 1,
    title: "What is Fritado",
    flipContent: <FritadoOverviewPg1 />,
  },
  {
    id: 2,
    title: "My SEO Progresso",
    flipContent: <FritadoOverviewPg2 />,
  },
  {
    id: 3,
    title: "Seona Affecting My Website",
    flipContent: <FritadoOverviewPg3 />,
  },
  {
    id: 4,
    title: "Pricing and Billing",
    flipContent: <FritadoOverviewPg4 />,
  },
];
export const GettingStarted = [
  {
    id: 1,
    title: "Onboarding",
    flipContent: <GSOnboarding />,
  },
  {
    id: 2,
    title: "Setting up Fritado",
    flipContent: <GSSettingUp />,
  },
  {
    id: 3,
    title: "Getting Started Troubleshooting",
    flipContent: <GSTroubleshooting />,
  },
  {
    id: 4,
    title: "Website Linking Instructions",
    flipContent: <GSInstruction />,
  },
  {
    id: 5,
    title: "Website Linking Troubleshooting",
    flipContent: <GSWebTroubleShooting />,
  },
];
export const Features = [
  {
    id: 1,
    title: "Overview Page",
    flipContent: <OverviewPage />,
  },
  {
    id: 2,
    title: "Blog Posts",
    flipContent: <BlogPosts />,
  },
  {
    id: 3,
    title: "Code Change",
    flipContent: <CodeChanges />,
  },
  {
    id: 4,
    title: "Keywords",
    flipContent: <Keyword />,
  },
];
export const Fritadopro = [
  {
    id: 1,
    title: "What is Fritado Pro?",
    flipContent: <FritadoPro />,
  },
];
export const GeneralResources = [
    {
      id: 1,
      title: "Settings Page",
      flipContent: <SettingPage />,
    },
    {
      id: 2,
      title: "Product Updates",
      flipContent: <ProductUpdate />,
    },
    {
      id: 3,
      title: "System Requirements",
      flipContent: <SystemRequirements />,
    },
    {
      id: 4,
      title: "SEO Basics",
      flipContent: <SEOBasics />
    },
    {
        id: 5,
        title: "Preferred Website Providers",
        flipContent: <WebsiteProvider />,
      },
  ];
