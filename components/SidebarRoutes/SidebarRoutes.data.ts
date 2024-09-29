import {
    BarChart4,
    Building2,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    Bookmark,
    ShoppingBasket,
    Package
} from 'lucide-react'

export const dataGeneralSideBar = [
    {
        icon: ShoppingBasket,
        label: "Productos",
        href: "/products"
    },
    {
        icon: Package,
        label: "Categorias",
        href: "/categories"
    },
    {
        icon: Bookmark,
        label: "Marcas",
        href: "/brands"
    }
]

export const dataToolSidebar = [
    {
        icon: CircleHelpIcon,
        label: "Faqs",
        href: "/faqs"
    },
    {
        icon: BarChart4,
        label: "Analytics",
        href: "/analytics"
    }
]

export const dataSupportSidebar = [
    {
        icon: Settings,
        label: "Settings",
        href: "/settings"
    },
    {
        icon: ShieldCheck,
        label: "Security",
        href: "/security"
    }
]