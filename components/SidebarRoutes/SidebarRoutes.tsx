"use client"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { SidebarItem } from "../SidebarItem"
import { dataGeneralSideBar, dataSupportSidebar, dataToolSidebar } from "./SidebarRoutes.data"
import { CustomIcon } from "../CustomIcon"
import { BookText, PanelsTopLeft } from "lucide-react"
import Link from "next/link"

export function SidebarRoutes() {
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">GENERAL</p>
                    <div className="">
                        <Link href="/" className="flex gap-2 items-center">
                            <PanelsTopLeft />
                            <p>DashBoard</p>
                        </Link>
                    </div>
                    <Accordion type="multiple">
                        <AccordionItem value="catalogos">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                    <CustomIcon icon={BookText} />
                                    Catálogos
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {dataGeneralSideBar.map((item) => (
                                    <SidebarItem key={item.label} item={item} />
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <Separator />

                <div className="p-2 md:p-6">
                    <p className=" text-slate-500 mb-2">TOOLS</p>
                    {dataToolSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>

                <Separator />

                <div className="p-2 md:p-6">
                    <p className=" text-slate-500 mb-2">SUPPORT</p>
                    {dataSupportSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>
            </div>
            <div>
                <div className="text-center p-6">
                    <Button variant="outline" className="w-full">
                        UpradgePlan
                    </Button>
                </div>

                <Separator />

                <footer className=" mt-3 p-3 text-center">
                    2024. All right reserved
                </footer>
            </div>
        </div>
    )
}
