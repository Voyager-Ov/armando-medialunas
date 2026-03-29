import { Badge } from "@/components/ui/badge";
import { Channel } from "@/lib/types";

const channelLabel: Record<Channel, string> = {
  MOSTRADOR: "Mostrador",
  PEDIDOS_YA: "PedidosYa",
  UBER_EATS: "Uber Eats",
  RAPPI: "Rappi",
  MERCADO_LIBRE: "Mercado Libre"
};

export function ChannelBadge({ channel }: { channel: Channel }) {
  return <Badge variant="outline">{channelLabel[channel]}</Badge>;
}
