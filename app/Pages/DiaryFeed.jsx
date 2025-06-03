"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import DiaryTag from "../Components/DiaryFeed/DiaryTag";
import DiaryCard from "../Components/DiaryFeed/DiaryCard";

const projectsData = [
    {
        id: 1,
        title: "WOC ( Warkop or Coffee Shop)",
        description:
            "WOC (Warkop Or Coffee Shop) adalah sebuah website restoran yang menyediakan menu minuman dingin. Website ini dibuat dengan fitur login, register, home, produk, pencarian, detail produk, wishlist, dll. Dibuat menggunakan Next.js, MongoDB, TailwindCSS, dan dideploy di Vercel.",
        image: "/images/experiences/woc.png",
        tag: ["All", "Web"],
        gitUrl: "https://woc.msodikin.web.id",
    },
    {
        id: 2,
        title: "Fastbook",
        description:
            "Fastbook adalah mobile app mirip Facebook dengan fitur login, register, post, like, comment, follow, dll. Dibuat dengan React Native, GraphQL, Apollo Server, dan MongoDB.",
        image: "/images/experiences/fastbook.png",
        tag: ["All", "Mobile"],
        gitUrl: "https://shorturl.at/FWvNS",
    },
];

export default function DiaryFeed() {
    const [tag, setTag] = useState("All");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const handleTagChange = (newTag) => {
        setTag(newTag);
    };

    const filteredProjects = projectsData.filter((project) =>
        project.tag.includes(tag)
    );

    const cardVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
    };

    return (
        <div className="min-h-screen border-2 overflow-x-hidden bg-[#FFF7ED] relative text-[#3E2C23]">
            <section id="projects">
                <h2 className="text-center text-4xl font-bold text-white mt-10 mb-10 md:mb-12">
                    My Projects
                </h2>
                <div className="text-white mb-10 flex flex-row justify-center items-center gap-2 py-6 flex-wrap px-4">
                    <DiaryTag
                        onClick={handleTagChange}
                        name="All"
                        isSelected={tag === "All"}
                    />
                    <DiaryTag
                        onClick={handleTagChange}
                        name="Web"
                        isSelected={tag === "Web"}
                    />
                    <DiaryTag
                        onClick={handleTagChange}
                        name="Mobile"
                        isSelected={tag === "Mobile"}
                    />
                </div>
                <ul
                    ref={ref}
                    className="grid md:grid-cols-2 gap-8 md:gap-12 ml-10"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.li
                            key={project.id}
                            variants={cardVariants}
                            initial="initial"
                            animate={isInView ? "animate" : "initial"}
                            transition={{ duration: 0.3, delay: index * 0.4 }}
                        >
                            <DiaryCard
                                title={project.title}
                                description={project.description}
                                imgUrl={project.image}
                                gitUrl={project.gitUrl}
                            />
                        </motion.li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
