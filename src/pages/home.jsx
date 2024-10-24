import { Users, ShieldCheck, Clock, BarChart, Fingerprint } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#18181C] text-[#E5E5E7]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#121215]">
        <Link className="flex items-center justify-center" href="#">
          <Fingerprint className="h-6 w-6 text-[#FC356C]" />
          <span className="ml-2 text-2xl font-bold text-[#E5E5E7]">
            Attendify
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-sm font-medium hover:text-[#FC356C] transition-colors"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-sm font-medium hover:text-[#FC356C] transition-colors"
            href="#how-it-works"
          >
            How It Works
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#121215] flex justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#E5E5E7]">
                  Welcome to Attendify
                </h1>
                <p className="mx-auto max-w-[700px] text-[#A9A9AB] md:text-xl">
                  Revolutionize attendance tracking with secure
                  WebAuthentication technology. Simplify admin tasks and empower
                  students.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="bg-[#FC356C] text-[#E5E5E7] hover:bg-[#FC356C]/90 px-6 py-3 rounded-lg"
                  to={"/login"}
                >
                  Get Started
                </Link>
                <Link
                  variant="outline"
                  className="border border-border px-6 py-3 rounded-lg text-[#E5E5E7] hover:bg-[#1C1D20]"
                  to={"https://github.com/Sreejit-Sengupto/attendify"}
                  target="_blank"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#1C1D20] flex justify-center items-center"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-[#E5E5E7]">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Fingerprint,
                  title: "WebAuthentication",
                  content:
                    "Leverage built-in hardware like fingerprint sensors for secure and easy attendance marking and admin login.",
                },
                {
                  icon: Users,
                  title: "Multi-User Support",
                  content:
                    "Distinct interfaces and functionalities for administrators and students.",
                },
                {
                  icon: ShieldCheck,
                  title: "Enhanced Security",
                  content:
                    "Ensure data integrity and prevent attendance fraud with biometric verification.",
                },
                {
                  icon: Clock,
                  title: "Real-Time Tracking",
                  content:
                    "Instantly record and update attendance information as students check in.",
                },
                {
                  icon: BarChart,
                  title: "Comprehensive Reports",
                  content:
                    "Generate detailed attendance reports and analytics for better insights.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#121215] px-6 py-8 border border-border rounded-lg"
                >
                  <div className="mb-3">
                    <feature.icon className="h-8 w-8 mb-2 text-[#FC356C]" />
                    <p className="text-[#E5E5E7] text-xl font-semibold">
                      {feature.title}
                    </p>
                  </div>
                  <div className="text-[#A9A9AB]">{feature.content}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#18181C] flex justify-center items-center"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-[#E5E5E7]">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                {
                  title: "For Administrators",
                  steps: [
                    "Log in securely using WebAuthentication.",
                    "Attendance for individual classes.",
                    "View registered students details.",
                    "View attendance data.",
                    "More new exciting features to come...",
                  ],
                },
                {
                  title: "For Students",
                  steps: [
                    "Register your biometric data (one-time setup) or hardware.",
                    "Use fingerprint or other supported biometric/hardware to mark attendance.",
                    "View your attendance stats.",
                    "Receive notifications for successful check-ins(coming soon...)",
                    "More new exciting features to come...",
                  ],
                },
              ].map((role, index) => (
                <div
                  key={index}
                  className="bg-[#121215] px-6 py-7 border border-border rounded-lg"
                >
                  <div className="mb-3 font-semibold text-xl">
                    <p className="text-[#E5E5E7]">{role.title}</p>
                  </div>
                  <div>
                    <ol className="list-decimal list-inside space-y-2 text-[#A9A9AB]">
                      {role.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#1C1D20] flex justify-center items-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#E5E5E7]">
                  Ready to Get Started?
                </h2>
                <p className="max-w-[600px] text-[#A9A9AB] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join the growing number of institutions using Attendify to
                  streamline their attendance processes.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link
                  className="block w-full bg-[#FC356C] text-[#E5E5E7] hover:bg-[#FC356C]/90 rounded-lg p-3"
                  size="lg"
                  to={"/login"}
                >
                  Try out now!
                </Link>
                <Link
                  className="block w-full bg-transparent border border-border text-[#E5E5E7] hover:bg-[#1C1D20] rounded-lg p-3"
                  variant="outline"
                  size="lg"
                  to="mailto:sreesen03@gmail.com"
                >
                  Contact the Team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#2D2C31] bg-[#121215]">
        <p className="text-xs text-[#A9A9AB]">
          © 2024 Attendify. All rights reserved.
        </p>

        <div className="flex justify-center items-center gap-1 mx-auto">
          <p className="text-xs text-[#A9A9AB]">Powered by</p>
          <img
            src="data:image/svg+xml,%3csvg%20width='160'%20height='29'%20viewBox='0%200%20160%2029'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M46.7348%2023.5568C49.3517%2023.5568%2050.6746%2022.2116%2051.2497%2021.2957H51.5085C51.6236%2022.2688%2052.3137%2023.1847%2053.6653%2023.1847H56.2247V20.3226H55.5633C55.1032%2020.3226%2054.8731%2020.0651%2054.8731%2019.6644V8.18757H51.4798V10.0193H51.221C50.5595%209.10343%2049.1792%207.8155%2046.6486%207.8155C42.6226%207.8155%2039.6318%2011.1355%2039.6318%2015.6861C39.6318%2020.2368%2042.6801%2023.5568%2046.7348%2023.5568ZM47.3387%2020.294C44.9519%2020.294%2043.0827%2018.5482%2043.0827%2015.7148C43.0827%2012.9386%2044.8944%2011.0496%2047.31%2011.0496C49.6106%2011.0496%2051.5373%2012.7382%2051.5373%2015.7148C51.5373%2018.262%2049.8981%2020.294%2047.3387%2020.294Z'%20fill='%23EDEDF0'/%3e%3cpath%20d='M58.2281%2029H61.6215V21.2957H61.8803C62.513%2022.2116%2063.8645%2023.5568%2066.539%2023.5568C70.565%2023.5568%2073.4982%2020.1796%2073.4982%2015.6861C73.4982%2011.1641%2070.3637%207.8155%2066.3089%207.8155C63.7208%207.8155%2062.4554%209.21791%2061.8515%209.99066H61.5927V8.18757H58.2281V29ZM65.82%2020.3799C63.4907%2020.3799%2061.564%2018.6627%2061.564%2015.6861C61.564%2013.1389%2063.2031%2010.9924%2065.7625%2010.9924C68.1494%2010.9924%2070.0186%2012.8527%2070.0186%2015.6861C70.0186%2018.4623%2068.2069%2020.3799%2065.82%2020.3799Z'%20fill='%23EDEDF0'/%3e%3cpath%20d='M75.2492%2029H78.6425V21.2957H78.9013C79.534%2022.2116%2080.8856%2023.5568%2083.56%2023.5568C87.586%2023.5568%2090.2396%2020.1796%2090.2396%2015.6861C90.2396%2011.1641%2087.3847%207.8155%2083.3299%207.8155C80.7418%207.8155%2079.4765%209.21791%2078.8726%209.99066H78.6137V8.18757H75.2492V29ZM82.841%2020.3799C80.5117%2020.3799%2078.585%2018.6627%2078.585%2015.6861C78.585%2013.1389%2080.2242%2010.9924%2082.7835%2010.9924C85.1704%2010.9924%2087.0396%2012.8527%2087.0396%2015.6861C87.0396%2018.4623%2085.2279%2020.3799%2082.841%2020.3799Z'%20fill='%23EDEDF0'/%3e%3cpath%20d='M94.7253%2023.5329H99.5277L102.26%2011.7699H102.432L105.164%2023.5329H109.938L113.76%208.53582H110.34L107.608%2020.3275H107.35L104.618%208.53582H100.103L97.3422%2020.3275H97.0834L94.3802%208.53582H90.7568L94.7253%2023.5329Z'%20fill='%23EDEDF0'/%3e%3cpath%20d='M115.48%2023.5329H118.873V16.1202C118.873%2013.2868%20120.196%2011.541%20122.669%2011.541H124.164V8.16376H123.043C121.116%208.16376%20119.649%209.4803%20119.074%2010.7396H118.844V8.53582H115.48V23.5329Z'%20fill='%23EDEDF0'/%3e%3cpath%20d='M141.004%2023.5329H143.649V20.5278H141.032C139.997%2020.5278%20139.566%2020.0699%20139.566%2019.0109V11.5124H143.822V8.53582H139.566V4.32861H136.345V8.53582H133.527V11.5124H136.144V19.0395C136.144%2022.2164%20138.07%2023.5329%20141.004%2023.5329Z'%20fill='%23EDEDF0'/%3e%3cpath%20d='M152.753%2023.5568C155.888%2023.5568%20158.648%2022.0113%20159.626%2018.8916L156.52%2018.1475C155.974%2019.8075%20154.392%2020.6661%20152.724%2020.6661C150.251%2020.6661%20148.612%2019.0634%20148.583%2016.5447H160V15.6003C160%2011.1355%20157.21%207.8155%20152.609%207.8155C148.555%207.8155%20145.075%2010.9924%20145.075%2015.7148C145.075%2020.294%20148.152%2023.5568%20152.753%2023.5568ZM148.612%2014.0834C148.813%2012.2803%20150.452%2010.7634%20152.609%2010.7634C154.68%2010.7634%20156.376%2012.0513%20156.549%2014.0834H148.612Z'%20fill='%23EDEDF0'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M132.018%2023.5329H128.625V11.5124H125.979V8.53582H132.018V23.5329Z'%20fill='%23EDEDF0'/%3e%3cpath%20d='M130.069%206.45465C131.306%206.45465%20132.226%205.53879%20132.226%204.33673C132.226%203.16329%20131.306%202.24744%20130.069%202.24744C128.833%202.24744%20127.912%203.16329%20127.912%204.33673C127.912%205.53879%20128.833%206.45465%20130.069%206.45465Z'%20fill='%23EDEDF0'/%3e%3cpath%20d='M29.6277%2019.8556V26.4741H13.0326C8.19779%2026.4741%203.97629%2023.8122%201.71769%2019.8556C1.38936%2019.2803%201.10198%2018.6769%200.860926%2018.0505C0.387713%2016.8231%200.0902487%2015.506%200%2014.1317V12.3423C0.0195935%2012.0361%200.050468%2011.7322%200.0908425%2011.432C0.173373%2010.8159%200.298058%2010.213%200.461931%209.62693C2.01219%204.07098%207.05306%200%2013.0326%200C19.0122%200%2024.0525%204.07098%2025.6027%209.62693H18.5069C17.342%207.81586%2015.3257%206.61852%2013.0326%206.61852C10.7396%206.61852%208.72325%207.81586%207.55833%209.62693C7.20328%2010.1775%206.92778%2010.7846%206.74728%2011.432C6.58697%2012.006%206.50147%2012.6113%206.50147%2013.237C6.50147%2015.1341%207.28877%2016.8441%208.55107%2018.0505C9.72074%2019.1702%2011.2977%2019.8556%2013.0326%2019.8556H29.6277Z'%20fill='%23FD366E'/%3e%3cpath%20d='M29.6277%2011.432V18.0505H17.5142C18.7765%2016.8442%2019.5638%2015.1342%2019.5638%2013.2371C19.5638%2012.6113%2019.4783%2012.006%2019.3179%2011.432H29.6277Z'%20fill='%23FD366E'/%3e%3c/svg%3e"
            width="90"
            height="22"
            alt="Appwrite"
          ></img>
        </div>

        <nav className="flex gap-4 sm:gap-6">
          <Link
            className="text-xs text-[#A9A9AB] hover:text-[#FC356C] transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs text-[#A9A9AB] hover:text-[#FC356C] transition-colors"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
