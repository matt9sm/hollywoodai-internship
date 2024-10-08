import React from "react";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

export default function LandingFeatures() {
  const featuresList = [
    {
      Icon: PlayCircleIcon,
      title: "AI Generated Summaries",
      text: "Save time with summaries of the world's best movies.",
    },
    {
      Icon: PlayCircleIcon,
      title: "Read or Listen",
      text: "Switch between reading and listening modes seamlessly.",
    },
    {
      Icon: PlayCircleIcon,
      title: "Find Your Next Flick",
      text: "Explore our movie lists and perzonalized recommendations.",
    },
    {
      Icon: PlayCircleIcon,
      title: "Multi Platform Access",
      text: "Enjoy your favorite movie on any device.",
    },
    {
      Icon: PlayCircleIcon,
      title: "Payment Gateways",
      text: "We securely process all card payments.",
    },
    {
      Icon: PlayCircleIcon,
      title: "Eco-Friendly Option",
      text: "HollywoodAI donates 10% of profits to charities",
    },
  ];

  return (
    <section id="features">
      <div className="container">
        <div className="row features__row">
          <h1 className="features__title">The future of AI.</h1>
          <div className="features__para">
            HollywoodAI is esigned to help you enjoy high-quality summaries instantly, without a sweat
          </div>
          <div className="features__list">
            {featuresList.map((feature, index) => (
              <LandingFeature Icon={feature.Icon} key={index} title={feature.title} text={feature.text}  />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


interface LandingFeatureProps {
  title: string;
  text: string;
  Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
  } & React.RefAttributes<SVGSVGElement>>;
}

function LandingFeature({ title, text, Icon}: LandingFeatureProps) {
  return (
    <div className="feature">
      <div className="feature__iconWrapper">
        <Icon className="feature__icon" />
      </div>
      <div className="feature__text">
        <h4 className="feature__text__title">
          {title}
        </h4>
        <p className="feature__text__para">
          {text}
        </p>
      </div>
    </div>
  );
}
