import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
const devices = [
  { name: "Phones", sub: "iPhone · Samsung · Pixel", path: "/phones", image: "https://images.pexels.com/photos/36324071/pexels-photo-36324071.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { name: "Laptops", sub: "MacBook · Windows · Gaming", path: "/laptops", image: "https://images.pexels.com/photos/6968093/pexels-photo-6968093.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { name: "Gaming consoles", sub: "PlayStation · Xbox · Nintendo", path: "/gaming-consoles", image: "https://images.pexels.com/photos/10997627/pexels-photo-10997627.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { name: "Tablets", sub: "iPad · Galaxy Tab · Surface", path: "/tablets", image: "https://images.pexels.com/photos/10535365/pexels-photo-10535365.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { name: "Cameras", sub: "DSLR · Mirrorless · Lenses", path: "/cameras", image: "https://images.pexels.com/photos/4243662/pexels-photo-4243662.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { name: "Audio", sub: "Headphones · Speakers · Earbuds", path: "/headphones", image: "https://images.pexels.com/photos/18743222/pexels-photo-18743222.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { name: "Wearables", sub: "Apple Watch · Galaxy Watch", path: "/smart-watches", image: "https://images.pexels.com/photos/32977237/pexels-photo-32977237.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { name: "Drones", sub: "DJI · Camera drones · FPV", path: "/drones", image: "https://images.pexels.com/photos/20339624/pexels-photo-20339624.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { name: "Gaming PCs", sub: "Custom builds · Components", path: "/gamingpc", image: "https://images.pexels.com/photos/16776031/pexels-photo-16776031.jpeg?auto=compress&cs=tinysrgb&w=1400" },
];
export default function AcceptedDevices() { return <div className="rr-site"><Helmet><title>Accepted Devices | Road2Resell</title><meta name="description" content="Explore phones, laptops, tablets, gaming consoles, cameras, drones, wearables and more accepted by Road2Resell." /></Helmet><Header/><main><section className="accepted-hero"><div className="section-kicker"><span>ROAD2RESELL / THE DEVICE INDEX</span></div><h1>Good tech comes<br />in <em>many forms.</em></h1><p>Explore the devices we help move into their next chapter. Choose a category to see what matters and request a quote.</p><a href="#accepted-grid" className="button-primary">Explore categories <ArrowUpRight size={16}/></a></section><section id="accepted-grid" className="accepted-grid section-pad">{devices.map((d,i)=><Link to={d.path} className="accepted-card" key={d.path}><div className="accepted-image"><img src={d.image} alt={d.name} loading="lazy"/><span>0{i+1}</span><i><ArrowUpRight/></i></div><div className="accepted-card-copy"><div><h2>{d.name}</h2><p>{d.sub}</p></div><ArrowUpRight size={17}/></div></Link>)}</section></main><Footer/></div> }
