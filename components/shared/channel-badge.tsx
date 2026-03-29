import { Badge } from "@/components/ui/badge";
import { Channel } from "@/types/domain";

const map: Record<Channel, { label: string; variant: "info" | "warning" | "success" | "secondary" | "outline" }> = {
  MOSTRADOR: { label: "Mostrador", variant: "secondary" },
  PEDIDOSYA: { label: "PedidosYa", variant: "warning" },
  UBER_EATS: { label: "Uber Eats", variant: "info" },
  RAPPI: { label: "Rappi", variant: "danger" },
  MERCADO_LIBRE: { label: "Mercado Libre", variant: "outline" }
};

export function ChannelBadge({ channel }: { channel: Channel }) {
  const data = map[channel];
  return <Badge variant={data.variant}>{data.label}</Badge>;
}
