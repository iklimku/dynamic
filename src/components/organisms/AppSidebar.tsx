import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarHeader
} from "@/components/ui/sidebar"
import {
  Leaf,
  Waves,
  HeartPulse,
  Sun,
  Building2,
  LucideIcon,
} from "lucide-react";
import LogoBMKG from "@/../public/logo-bmkg.svg";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import navbarJson from "@/../public/data/navbar.json";
import sectoralJson from "@/../public/data/sectoral.json";
import Link from "next/link";
import Image from "next/image";

interface Data {
  title: string;
  subMenu: { title: string; href: string }[];
}

interface SectoralData {
  title: string;
  icon: string;
  href: string;
}

export function AppSidebar() {
  const datas: Data[] = navbarJson;
  const items: SectoralData[] = sectoralJson;

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        {/* Logo BMKG */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={LogoBMKG} alt="Logo BMKG" height={48} />
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold 2xl:text-sm">
              Badan Meteorologi, Klimatologi, dan Geofisika
            </span>
            <span className="text-xs text-muted-foreground pointer-events-none">
              Deputi Klimatologi
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>

        {/* Main Content */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {datas.map((data) => (
                <Collapsible key={data.title} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {data.title}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {data.subMenu.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <Link href={subItem.href}>
                                {subItem.title}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sectoral Content */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Sektoral</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`/${item.href}`}>
                      {item.icon === "Leaf" && <Leaf />}
                      {item.icon === "Waves" && <Waves />}
                      {item.icon === "HeartPulse" && <HeartPulse />}
                      {item.icon === "Sun" && <Sun />}
                      {item.icon === "Building2" && <Building2 />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}