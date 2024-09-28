// "use client"

// import * as React from "react"
// import { TrendingUp } from "lucide-react"
// import { Label, Pie, PieChart } from "recharts"



// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// import { useUser } from "@clerk/nextjs"


// export function PieChartComponent() {

//   const { user } = useUser();

//   const newusername = user?.username;
  
// const formData = new FormData();
// const data1 = {
//   username:newusername
// }
// formData.append('username',JSON.stringify(data1));
// fetch("http://127.0.0.1:8000/get_hold", {
//   method: "POST",
//   body: formData,
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     dict = data.predictedRisk;
//     alert(dict.hypertension)
//   })
//   .catch((error) => {
//     console.error("Error during fetch operation:", error);

//   });


//   const totalVisitors = React.useMemo(() => {
//     return "Analysis"
//   }, [])




//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         {/* <CardTitle className="flex justify-center">AI Health Risk Assessment Report</CardTitle> */}
//         <CardTitle className="flex justify-center items-center h-full">AI Risk Assessment Report</CardTitle>

//         <CardDescription>Personalized Risk Analysis</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Pie
//               data={chartData}
//               dataKey="visitors"
//               nameKey="browser"
//               innerRadius={60}
//               strokeWidth={5}
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-2xl font-bold"
//                         >
//                           {totalVisitors.toLocaleString()}
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 24}
//                           className="fill-muted-foreground"
//                         >
                        
//                         </tspan>
//                       </text>
//                     )
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//         Risk level categorized <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//         {/* Displaying your overall health risk based on multiple factors */}

//         </div>
//       </CardFooter>
//     </Card>
//   )
// }
// var dict = {}
// alert(dict.hypertension);


// var chartData = [
//   { browser: "hypertension", visitors: (1 - dict.hypertension)*100, fill: "var(--color-chrome)" },
//   { browser: "diabetes", visitors: (1 - dict.heart) * 100, fill: "var(--color-safari)" },
//   { browser: "heart", visitors: (1 - dict.diabetes) * 100, fill: "var(--color-firefox)" },
// ]


// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// }









"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useUser } from "@clerk/nextjs"

export function PieChartComponent() {
  const { user } = useUser();
  const [chartData, setChartData] = React.useState(null); // Use state for chart data

  const newusername = user?.username;

  React.useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
      const formData = new FormData();
      const data1 = {
        username: newusername,
      };
      formData.append("username", JSON.stringify(data1));

      try {
        const response = await fetch("http://127.0.0.1:8000/get_hold", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const dict = data.predictedRisk;

        // Update chart data
        setChartData([
          { browser: "hypertension", visitors: (1 - dict.hypertension) * 100, fill: "var(--color-chrome)" },
          { browser: "diabetes", visitors: (1 - dict.diabetes) * 100, fill: "var(--color-safari)" },
          { browser: "heart", visitors: (1 - dict.heart) * 100, fill: "var(--color-firefox)" },
        ]);

      } catch (error) {
        console.error("Error during fetch operation:", error);
      }
    };

    fetchData();
  }, [newusername]); // Dependency on newusername so it fetches when user is available

  const totalVisitors = React.useMemo(() => {
    return "Analysis";
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex justify-center items-center h-full">
          AI Risk Assessment Report
        </CardTitle>
        <CardDescription>Personalized Risk Analysis</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          {chartData ? ( // Render chart only when data is available
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          ) : (
            <p>Loading data...</p> // Loading state while fetching
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Risk level categorized <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {/* Displaying your overall health risk based on multiple factors */}
        </div>
      </CardFooter>
    </Card>
  );
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};
