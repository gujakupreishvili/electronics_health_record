import Footer from "@/components/footer/footer";
import { Database, Shield, Users } from "lucide-react";
import React from "react";
import { IoCalendarClearOutline } from "react-icons/io5";

export default function Main() {
  return (
    <>
      <div className="bg-blue-200 w-full flex flex-col justify-center items-center">
        <div className="lg:w-[50%] w-[90%] text-center lg:py-[100px] py-[50px] flex flex-col gap-[30px]">
          <h1 className="text-black lg:text-[33px] text-[18px] font-bold">
            ერთიანი ჯანდაცვის ჩანაწერები საქართველოსთვის
          </h1>
          <p className=" lg:text-[18px] text-[14px] font-normal text-gray-500">
            უსაფრთხო, ცენტრალიზებული ელექტრონული სამედიცინო ჩანაწერები, რომლებიც
            უზრუნველყოფენ ჯანდაცვის შეუფერხებელ კოორდინაციას ქვეყნის მასშტაბით
            ყველა სამედიცინო დაწესებულებაში.
          </p>
        </div>
      </div>
      {/* section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 mb-4">
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                უსაფრთხო & თავსებადი
              </h3>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-200 mb-4">
                <Database className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                ცენტრალიზებული ჩანაწერები
              </h3>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 mb-4">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                მომხმარებელთა ინფორმაცია
              </h3>
            </div>
          </div>
        </div>
      </section>
      {/* news section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            უახლესი ჯანმრთელობის სიახლეები
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-full sm:w-[80%] md:w-[45%]  border border-gray-300 rounded-lg flex flex-col p-5 gap-2 shadow-sm hover:shadow-xl hover:cursor-pointer transition-shadow duration-300"
                >
                  <p className="flex items-center justify-end text-sm text-gray-500 gap-1">
                    <IoCalendarClearOutline className="text-gray-500" />
                    2024-01-15
                  </p>
                  <h2 className="lg:text-lg text-[15px] font-bold">
                    WHO Updates Global Health Guidelines
                  </h2>
                  <p className="lg:text-base text-[12px] font-medium text-gray-700 pt-[5px]">
                    New international standards for electronic health records
                    implementation across healthcare systems.
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
