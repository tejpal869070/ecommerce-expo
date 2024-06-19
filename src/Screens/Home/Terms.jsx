import { Box, ScrollView, Text } from "native-base";
import React from "react";
import { Colors } from "../../color";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const data = [
  {
    id: 1,
    heading: "Product Descriptions and Pricing:",
    items: [
      "We strive to provide accurate descriptions and pricing for all products. However, we do not guarantee that product descriptions, images, or prices are error-free. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.",
    ],
  },
  {
    id: 1,
    heading: "Order Acceptance and Fulfillment:",
    items: [
      "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, inaccuracies in product information, or errors in pricing.",
      "In the event that we are unable to fulfill an order, we will notify you promptly and provide a full refund for the unavailable item(s).",
    ],
  },
  {
    id: 1,
    heading: "Payment",
    items: [
      "Payment for orders must be made in full at the time of purchase. We accept various forms of payment, including credit/debit cards, PayPal, etc.",
      "All transactions are processed securely, and customer payment information is encrypted to ensure confidentiality.",
    ],
  },
  {
    id: 1,
    heading: "Shipping and Delivery:",
    items: [
      "We strive to process and ship orders in a timely manner. However, delivery times may vary depending on factors such as product availability, shipping destination, and courier delays.",
      "Shipping costs and estimated delivery times are provided at the time of checkout and may vary based on the selected shipping method.",
      "We are not responsible for any delays, damages, or lost packages caused by the shipping carrier.",
    ],
  },
  {
    id: 1,
    heading: "Returns and Exchanges:",
    items: [
      "We want you to be completely satisfied with your purchase. If for any reason you are not satisfied, you may return the item(s) within [X] days of delivery for a refund or exchange, subject to our return policy.",
      "Please review our return policy for detailed information on eligibility, procedures, and any applicable restocking fees.",
    ],
  },
  {
    id: 1,
    heading: "Intellectual Property:",
    items: [
      "All content included on our website, such as text, graphics, logos, images, and software, is the property of [Your Company] and is protected by copyright and other laws.",
      "You may not reproduce, distribute, modify, or transmit any content from our website without prior written consent.",
    ],
  },
  {
    id: 1,
    heading: "Privacy Policy:",
    items: [
      "We are committed to protecting your privacy and safeguarding your personal information. Please review our privacy policy for details on how we collect, use, and disclose your information.",
    ],
  },
  {
    id: 1,
    heading: "Disclaimer of Warranties:",
    items: [
      "We make no representations or warranties of any kind, express or implied, regarding the products sold on our website. All products are sold as is  without any warranty of merchantability or fitness for a particular purpose.",
    ],
  },
  {
    id: 1,
    heading: "Limitation of Liability:",
    items: [
      "In no event shall [Your Company] be liable for any indirect, consequential, incidental, special, or punitive damages arising out of or related to your use of our website or the products purchased through our website.",
    ],
  },
  {
    id: 1,
    heading: "Governing Law:",
    items: [
      "These terms and conditions shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law principles.",
    ],
  },
  {
    id: 1,
    heading: "Changes to Terms and Conditions:",
    items: [
      "We reserve the right to update or modify these terms and conditions at any time without prior notice. Changes will be effective immediately upon posting to our website.",
    ],
  },
  {
    id: 1,
    heading: "Contact Information:",
    items: [
      "If you have any questions or concerns about these terms and conditions, please contact us at [Your Contact Information].",
    ],
  },
];

export default function Terms() {
  return (
    <Box flex={1} py={4} px={4} bg={Colors.lightGreen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((i, index) => (
          <Box mb={3} key={index}>
            <Text bold fontSize={17}>
              <FontAwesome name="hand-o-right" size={16} color="black" />
              {"  "}
              {i.heading}
            </Text>
            {i.items.map((item, index2) => (
              <Text
                key={index2}
                ml={5}
                color={Colors.lightBlack}
                textAlign="justify"
              >
                <Entypo name="dot-single" size={20} color="black" />
                {item}
              </Text>
            ))}
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
}
