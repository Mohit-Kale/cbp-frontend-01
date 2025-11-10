"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthDialog } from "@/components/auth/useAuthDialog.hook";

export function CallToActionSection() {

    const { openAuthDialog } = useAuthDialog()
    return (
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                    Ready to Access Global Executive Expertise?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join technology companies worldwide getting C-suite guidance by the hour
                </p>
                {/* <Link href="/find-experts" passHref> */}
                <Button
                    asChild
                    className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:bg-primary/90 shadow-lg rounded-lg"
                    onClick={() => openAuthDialog('signin')}
                >
                    <span>Get Started Today</span>
                </Button>
                {/* </Link> */}
            </div>
        </section>
    );
}
