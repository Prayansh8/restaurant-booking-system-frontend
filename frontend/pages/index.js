import BookingPage from "@/components/booking";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";

const HomePage = () => (
  <>
    {/* <div className="flex items-center justify-center min-h-screen"> */}
    <div className="flex items-center justify-center">
      <div
        className="text-center my-10"
        style={{
          border: "2px solid white",
          padding: "40px 50px",
          borderRadius: "30px",
        }}
      >
        <h1 className="text-4xl font-bold mb-0 animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-transparent md:text-5xl aos-init aos-animate">
          Welcome to Our Restaurant
        </h1>
        {/* <Link href="/booking" legacyBehavior>
        <button className="text-blue-500 btn group mb-4 px-6 py-2 w-full bg-gradient-to-t from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto">
        Make a Reservation
        <span className="text-blue-500 ml-1 tracking-normal transition-transform group-hover:translate-x-0.5">
        &gt;
        </span>
        </button>
        </Link> */}
      </div>
    </div>
    {/* <div>
      <BookingForm />
    </div>*/}
    <div>
      <BookingPage />
    </div> 
  </>
);

export default HomePage;
