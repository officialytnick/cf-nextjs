import React, { useState } from "react";
import {
  Globe,
  MapPin,
  Building2,
  Wifi,
  Copy,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const IpAddressFinder = () => {
  const { toast } = useToast();
  const [ipInfo, setIpInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchIp = async () => {
    setLoading(true);
    setIpInfo(null);

    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      const ip = data.ip;

      let geo = null;
      try {
        const g = await fetch(`https://ipapi.co/${ip}/json/`);
        geo = await g.json();
      } catch (_) {}

      setIpInfo({ ip, geo });
    } catch (err) {
      toast({
        title: "Failed to fetch IP",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      {/* TOOL HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Globe className="h-6 w-6 text-red-500" />
          IP Address Finder
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Find your public IP address and basic location details.
        </p>
      </div>

      {/* MAIN TOOL AREA */}
      <div className="bg-white border rounded-xl p-6 lg:p-8">
        {/* ACTION BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button
            onClick={fetchIp}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white px-6"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Detecting…
              </>
            ) : (
              "Find My IP"
            )}
          </Button>

          <span className="text-sm text-gray-500">
            One click to detect your public IP
          </span>
        </div>

        {/* RESULT */}
        {ipInfo && (
          <div className="mt-8 bg-gray-50 border rounded-lg p-5">
            {/* IP */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-medium text-gray-900">
                <Wifi className="h-4 w-4 text-blue-600" />
                {ipInfo.ip}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(ipInfo.ip)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {/* GEO INFO */}
            {ipInfo.geo && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
                {ipInfo.geo.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    {ipInfo.geo.city}
                  </div>
                )}

                {ipInfo.geo.region && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    {ipInfo.geo.region}
                  </div>
                )}

                {ipInfo.geo.country_name && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-purple-600" />
                    {ipInfo.geo.country_name}
                  </div>
                )}

                {ipInfo.geo.org && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-orange-600" />
                    {ipInfo.geo.org}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IpAddressFinder;
