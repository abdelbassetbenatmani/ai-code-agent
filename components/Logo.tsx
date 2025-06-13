import { CodeXml } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Logo = ({ href = "/" }: { href?: string }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <motion.div
            className="flex items-center space-x-3"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <Link href={href} className="flex items-center space-x-3">
                <div className="relative">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 shadow-lg">
                        <CodeXml className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground">Codiny</span>
                    <span className="-mt-1 text-xs text-muted-foreground">
                        Reviews and Refactoring
                    </span>
                </div>
            </Link>
        </motion.div>
    );
};

export default Logo;
