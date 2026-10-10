import { links } from "@/content/site";
import { heroFor, imageFor, type CaseStudy } from "./types";

const slug = "hellome-travel";
const img = imageFor(slug);

export const hellomeTravel: CaseStudy = {
  slug,
  name: "HelloMe Travels",
  tagline: "From booking to beautiful memories: flights, hotels and tours in one app",
  cardTagline: "Flights, hotels and tours in one app",
  accent: "#f2600c",
  tint: "#fdf1ea",
  hero: heroFor(slug, "100:41658", "HelloMe Travels app screens over snowy mountains"),
  overview: {
    body: "HelloMe Travels brings flights, hotels and tours into a single booking app. People can search return, one-way and multi-city flights, filter and compare results, book hotels and tours, pay by card or bank deposit, and keep everything in bookings and wishlists, with flight price alerts for the trips they are still planning.",
    cta: { label: "View website ↗", href: links.hellomeTravels },
    meta: [
      ["Role", "Product Designer"],
      ["Company", "HelloMe"],
      ["Type", "Mobile app · Travel"],
      ["Products", "Flights, hotels, tours"],
    ],
  },
  blocks: [
    {
      type: "centered",
      heading: "The challenge",
      body: "Planning a trip from Nigeria often means juggling several apps and agents, long forms, and prices that change across currencies. Flight results are dense and hard to compare, and the moment between paying and receiving a confirmation is full of anxiety. HelloMe Travels needed to make the journey from planning to departure feel seamless, in one place.",
    },
    img("100:41686", 1376, 774, "Home, flight results and flight details"),
    {
      type: "split",
      heading: "The solution",
      body: ["One travel app with a consistent booking pattern for flights, hotels and tours, so learning one flow teaches you the rest."],
      points: [
        "Flexible flight search: return, one-way and multi-city, with cabin class and travellers",
        "Results you can sort and filter by airline, price, stops and departure time",
        "Clear checkout: passenger details, add-ons, payment and instant confirmation",
        "Bookings, wishlists and flight price alerts to keep plans in one place",
      ],
    },
    {
      type: "split",
      heading: "Onboarding that sells the trip",
      body: ["Three illustrated screens set the emotional tone, from planning to departure, before a short sign-up."],
      points: [
        "Each screen pairs a travel moment with a single, benefit-led headline.",
        "Sign-up and email verification stay minimal, so people reach the home screen fast.",
      ],
    },
    img("135:46101", 1376, 709, "Onboarding screens"),
    img("135:46118", 1376, 840, "Sign-up and email verification"),
    {
      type: "split",
      heading: "Search that adapts to the trip",
      body: [
        "The home screen leads with flights, hotels and tours, then inspiring destinations. Flight search handles return, one-way and multi-city without separate apps or screens.",
      ],
      points: [
        "Cabin class and travellers open in focused bottom sheets instead of crowding the form.",
        "Destination cards show rating and price, so inspiration turns into a booking.",
      ],
    },
    img("135:46129", 1376, 840, "Home and flight search"),
    img("135:46140", 1376, 753, "Cabin class and traveller sheets, and the search loading state"),
    {
      type: "split",
      heading: "Comparing and choosing flights",
      body: ["Flight results are dense, so the design does the comparing: badges, clear times, layovers and bag allowances at a glance."],
      points: [
        "A booking timer makes the urgency honest without being pushy.",
        "Sort and filter sheets (cheapest, fastest, recommended) keep users on the results page.",
        "Flight details show every leg and layover on a simple timeline.",
      ],
    },
    img("135:46153", 1376, 709, "Flight results, sort and filter sheets"),
    img("135:46170", 1376, 840, "Flight details, contact info and passenger form"),
    {
      type: "split",
      heading: "Hotels and tours, same pattern",
      body: ["Hotels and tours reuse the flight booking pattern, so the whole app feels familiar after the first booking."],
      points: [
        "Hotel results lead with photos, rating and price per night.",
        "Room selection and reviews are separated into tabs to keep details scannable.",
      ],
    },
    img("135:46181", 1376, 840, "Hotel sort and hotel details"),
    img("135:46192", 1376, 753, "Hotel reviews, tours and booking confirmation"),
    {
      type: "split",
      heading: "Checkout, bookings and price alerts",
      body: ["After paying, people need certainty. Confirmation, bookings and price alerts keep them informed long after checkout."],
      points: [
        "Payment supports card and bank deposit, with clear deposit details.",
        "Bookings are grouped by flights, hotels and tours, with useful empty states.",
        "Flight price alerts let people set a route and get notified when fares drop.",
      ],
    },
    img("135:46205", 1376, 840, "Payment method and paying with HelloMe Money"),
    img("135:46216", 1376, 753, "Checkout, booking confirmation and bank deposit details"),
    img("135:46229", 1376, 840, "Bookings and wishlists"),
    {
      type: "split",
      heading: "Price alerts & profile",
      body: [
        "Not every trip is booked today. Price alerts and a well-organised profile keep travellers coming back until they are ready.",
      ],
      points: [
        "Flight price alerts work for return and one-way routes, so travellers are notified when fares drop.",
        "Saved travel information speeds up every future booking.",
        "Help lives in the profile, with FAQs, contact options and account settings in one place.",
      ],
    },
    img("135:46258", 1376, 840, "Flight price alerts and adding a new alert"),
    img("135:46269", 1376, 753, "Profile, travel information and FAQs"),
    {
      type: "split",
      heading: "The HelloMe Travels website",
      body: [
        "Alongside the app, I designed the HelloMe Travels website, giving travellers the same flights, hotels and tours experience on the web. Each homepage leads with a focused search (one-way, return and multi-city flights, hotels or tours), followed by trending flight deals, exclusive offers and top hotels to inspire the next trip.",
        "The design direction was warm, trustworthy and image-led: bold travel photography, the HelloMe orange for key actions, and clean cards that keep prices easy to compare. Trust signals like IATA accreditation, transparent pricing and 24/7 support sit right on the page, with FAQs answering common questions before checkout.",
      ],
      link: { label: "View live website ↗", href: links.hellomeTravels },
    },
    img("150:136601", 1376, 850, "HelloMe Travels website: hotel details, flights homepage with travel deals, and multi-city flight results"),
    {
      type: "split",
      heading: "The outcome",
      body: [
        "HelloMe Travels came together as a complete booking experience across flights (return, one-way and multi-city), hotels, tours, bookings, wishlists, price alerts and profile, all built on one reusable booking pattern.",
      ],
    },
  ],
  more: ["hellome-money", "soulsync"],
};
