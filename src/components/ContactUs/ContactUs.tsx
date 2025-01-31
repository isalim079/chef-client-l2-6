const ContactUs = () => {
  return (
    <div className="px-6 lg:px-0">
      <div className="py-28 font-poppins">
        <h1 className="text-center text-3xl font-bold font-sourGummy text-dark-green">
          Contact with us
        </h1>
        <div className="grid lg:grid-cols-3 gap-10 max-w-screen-xl mx-auto mt-10">
          {/* card 1 */}
          <div className="bg-primary-white p-10 rounded-lg">
            <h4 className="text-center text-2xl mb-2 font-sourGummy">Phone</h4>
            <p className="text-center">+880 434323143, +880 3243241</p>
          </div>
          {/* card 2 */}
          <div className="bg-primary-white p-10 rounded-lg">
            <h4 className="text-center text-2xl mb-2 font-sourGummy">
              Address
            </h4>
            <p className="text-center">Shyamoli, Dhaka</p>
          </div>
          {/* card 3 */}
          <div className="bg-primary-white p-10 rounded-lg">
            <h4 className="text-center text-2xl mb-2 font-sourGummy">Email</h4>
            <p className="text-center">chefbd@mail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
