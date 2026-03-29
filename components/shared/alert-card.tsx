import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OperationalAlert } from "@/lib/types";

export function AlertCard({ alert }: { alert: OperationalAlert }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm">{alert.title}</CardTitle>
          <Badge variant={alert.severity === "ALTA" ? "destructive" : "outline"}>{alert.severity}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{alert.detail}</p>
      </CardContent>
    </Card>
  );
}
