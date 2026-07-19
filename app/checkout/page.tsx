"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Truck, Check, } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/context";

const steps = ["Customer Info", "Delivery", "Payment", "Review"];

const paymentMethods = [
  { id: "cod", name: "Cash on Delivery", icon: "💵" },
  { id: "esewa", name: "eSewa", icon: "📱" },
  { id: "khalti", name: "Khalti", icon: "💳" },
  { id: "ime", name: "IME Pay", icon: "📲" },
  { id: "fonepay", name: "FonePay", icon: "🏦" },
  { id: "bank", name: "Bank Transfer", icon: "🏛️" },
];

const provinces = ["Bagmati Province", "Gandaki Province", "Lumbini Province", "Koshi Province", "Madhesh Province", "Karnali Province", "Sudurpashchim Province"];
const deliveryTimes = ["9:00 AM - 12:00 PM", "12:00 PM - 3:00 PM", "3:00 PM - 6:00 PM", "6:00 PM - 8:00 PM"];

// Validation helpers
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^\+?[0-9]{10,14}$/.test(phone);

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Customer info state
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Delivery info state
  const [delivery, setDelivery] = useState({
    recipientName: "",
    recipientPhone: "",
    province: "",
    district: "",
    municipality: "",
    ward: "",
    street: "",
    landmark: "",
    deliveryDate: "",
    deliveryTime: "9:00 AM - 12:00 PM",
    instructions: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Calculate order summary from cart
  const subtotal = totalPrice;
  const shipping = subtotal > 2000 ? 0 : 150;
  const tax = Math.round(subtotal * 0.13);
  const total = subtotal + shipping + tax;

  const orderItems = cart.map((item) => ({
    productId: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  // Handlers
  const handleCustomerChange = (field: string, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryChange = (field: string, value: string) => {
    setDelivery((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    if (step === 0) {
      if (!customer.firstName || !customer.lastName || !customer.email || !customer.phone) {
        toast.error("Please fill in all customer fields.");
        return false;
      }
      if (!isValidEmail(customer.email)) {
        toast.error("Please enter a valid email address.");
        return false;
      }
      if (!isValidPhone(customer.phone)) {
        toast.error("Please enter a valid phone number (10-14 digits).");
        return false;
      }
      return true;
    }
    if (step === 1) {
      if (!delivery.recipientName || !delivery.recipientPhone || !delivery.province || !delivery.district || !delivery.street) {
        toast.error("Please fill in all delivery fields.");
        return false;
      }
      if (!isValidPhone(delivery.recipientPhone)) {
        toast.error("Please enter a valid recipient phone number.");
        return false;
      }
      if (!delivery.deliveryDate) {
        toast.error("Please select a delivery date.");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(0) || !validateStep(1)) return;

    if (cart.length === 0) {
      toast.error("Your cart is empty. Add items before ordering.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customer: {
          name: `${customer.firstName} ${customer.lastName}`,
          email: customer.email,
          phone: customer.phone,
          address: `${delivery.street}, ${delivery.municipality || ""}, ${delivery.district}, ${delivery.province}`,
        },
        items: orderItems,
        total: total,
        paymentMethod,
        delivery: {
          recipient: delivery.recipientName,
          phone: delivery.recipientPhone,
          date: delivery.deliveryDate,
          time: delivery.deliveryTime,
          instructions: delivery.instructions,
        },
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Order placement failed");
      }

      toast.success(`Order placed successfully! Order ID: ${data.id}`);
      // Redirect after a short delay so the toast is visible
      setTimeout(() => router.push("/thank-you"), 1500);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#222222] mb-2">Checkout</h1>
          <p className="text-[#777777] mb-8">Complete your order in a few simple steps</p>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-12 max-w-2xl">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${index <= currentStep ? "bg-[#E91E63] text-white" : "bg-[#F0E0E5] text-[#777777]"}`}>
                  {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm hidden sm:block ${index <= currentStep ? "text-[#222222] font-medium" : "text-[#777777]"}`}>{step}</span>
                {index < steps.length - 1 && <div className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 ${index < currentStep ? "bg-[#E91E63]" : "bg-[#F0E0E5]"}`} />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              {currentStep === 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-card">
                  <h2 className="text-xl font-semibold mb-6">Customer Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name</label>
                      <Input
                        placeholder="Your first name"
                        value={customer.firstName}
                        onChange={(e) => handleCustomerChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name</label>
                      <Input
                        placeholder="Your last name"
                        value={customer.lastName}
                        onChange={(e) => handleCustomerChange("lastName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={customer.email}
                        onChange={(e) => handleCustomerChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone</label>
                      <Input
                        placeholder="+977 98XXXXXXXX"
                        value={customer.phone}
                        onChange={(e) => handleCustomerChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-card space-y-6">
                  <h2 className="text-xl font-semibold">Delivery Information</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Recipient Name</label>
                      <Input
                        placeholder="Recipient's full name"
                        value={delivery.recipientName}
                        onChange={(e) => handleDeliveryChange("recipientName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Recipient Phone</label>
                      <Input
                        placeholder="+977 98XXXXXXXX"
                        value={delivery.recipientPhone}
                        onChange={(e) => handleDeliveryChange("recipientPhone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Province</label>
                      <select
                        className="flex h-11 w-full rounded-lg border border-[#F0E0E5] bg-white px-4 py-2 text-sm"
                        value={delivery.province}
                        onChange={(e) => handleDeliveryChange("province", e.target.value)}
                      >
                        <option value="">Select Province</option>
                        {provinces.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">District</label>
                      <Input
                        placeholder="e.g., Kathmandu"
                        value={delivery.district}
                        onChange={(e) => handleDeliveryChange("district", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Municipality</label>
                      <Input
                        placeholder="e.g., Kathmandu Metro"
                        value={delivery.municipality}
                        onChange={(e) => handleDeliveryChange("municipality", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ward No.</label>
                      <Input
                        placeholder="e.g., 10"
                        value={delivery.ward}
                        onChange={(e) => handleDeliveryChange("ward", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Street / Tole</label>
                      <Input
                        placeholder="e.g., Thamel"
                        value={delivery.street}
                        onChange={(e) => handleDeliveryChange("street", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Nearby Landmark</label>
                    <Input
                      placeholder="e.g., Near XYZ Hotel, opposite ABC Bank"
                      value={delivery.landmark}
                      onChange={(e) => handleDeliveryChange("landmark", e.target.value)}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Delivery Date</label>
                      <Input
                        type="date"
                        value={delivery.deliveryDate}
                        onChange={(e) => handleDeliveryChange("deliveryDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Delivery Time</label>
                      <select
                        className="flex h-11 w-full rounded-lg border border-[#F0E0E5] bg-white px-4 py-2 text-sm"
                        value={delivery.deliveryTime}
                        onChange={(e) => handleDeliveryChange("deliveryTime", e.target.value)}
                      >
                        {deliveryTimes.map((time) => (
                          <option key={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Special Instructions</label>
                    <Textarea
                      placeholder="Any special delivery instructions..."
                      value={delivery.instructions}
                      onChange={(e) => handleDeliveryChange("instructions", e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-card">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          paymentMethod === method.id
                            ? "border-[#E91E63] bg-[#E91E63]/5"
                            : "border-[#F0E0E5] hover:border-[#E91E63]"
                        }`}
                      >
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <p className="font-medium text-sm">{method.name}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-card">
                  <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                  <div className="space-y-4">
                    {orderItems.map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-[#F0E0E5]">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-[#777777]">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-sm text-[#777777]">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#777777]">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#777777]">
                        <span>Tax (13%)</span>
                        <span>{formatPrice(tax)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t border-[#F0E0E5]">
                        <span>Total</span>
                        <span className="text-[#E91E63]">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Back
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button className="ml-auto gap-2" onClick={handleNext}>
                    Continue <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    className="ml-auto gap-2 bg-[#4CAF50] hover:bg-[#4CAF50]/90"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting || cart.length === 0}
                  >
                    {isSubmitting ? "Placing Order..." : <><Check className="w-4 h-4" /> Place Order</>}
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-card sticky top-32">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#777777]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#777777]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-[#777777]">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-[#F0E0E5] pt-3 flex justify-between font-semibold text-[#222222]">
                    <span>Total</span>
                    <span className="text-[#E91E63]">{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#FFF9FB] rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-[#777777]">
                    <Truck className="w-4 h-4 text-[#E91E63]" />
                    Free delivery on orders above Rs. 2,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}