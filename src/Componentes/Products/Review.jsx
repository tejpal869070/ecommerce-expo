import {
  Box,
  Button,
  HStack,
  Heading,
  Modal,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  TextArea,
  VStack,
} from "native-base";
import React, { useState } from "react";
import RatingStar from "./RatingStar";
import { Colors } from "../../color";
import { FontAwesome } from "@expo/vector-icons";
import { AddProductRating } from "../../Controller/Product/ProductController";
import { Alert } from "react-native";

export default function Review({ ratings, id }) {
  const [showModal, setShowModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [review, setReview] = useState("");
  const [value, setValue] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRatingChange = (value) => {
    setValue(value);
  };

  const formData = {
    rating: value,
    review: review,
    product_id: id,
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (review.length < 4) {
      setLoading(false);
      setError("Review must be at least 4 characters long");
      return;
    }
    setError("");
    try {
      const response = await AddProductRating(formData);
      if (response.status) {
        setLoading(false);
        Alert.alert(
          "Success",
          "Thanks for Sharing Product Review.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => setRatingModal(false),
            },
          ],
          { cancelable: false }
        );
      } else {
        setLoading(false);
        setError("Something went wrong, please try again later");
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong, please try again later");
    }
  };

  return (
    <Box mt={3} bg={Colors.white} py={3} mx={1} rounded={5} shadow={4}>
      <Heading bold px={3} fontSize={15} mb={2} color={Colors.green}>
        REVIEWS
      </Heading>

      {ratings &&
        ratings.slice(0, 4).map((i, index) => (
          <HStack
            w="full"
            borderTopWidth={0.5}
            borderBottomWidth={0.5}
            py={2}
            key={index}
          >
            <VStack px={2}>
              <RatingStar value={i.rating} />
              <Text fontSize={16}>{i.review}</Text>
              <Text mt={1} color={Colors.lightBlack} fontSize={12}>
                By {i.user}
              </Text>
            </VStack>
          </HStack>
        ))}

      <HStack justifyContent="space-between">
        <Pressable px={2} onPress={() => setRatingModal(true)}>
          <Text
            color={Colors.green}
            textAlign="right"
            fontSize={16}
            bold
            mt={2}
          >
            Add a Review
          </Text>
        </Pressable>
        <Pressable px={2} onPress={() => setShowModal(true)}>
          <Text
            color={Colors.green}
            textAlign="right"
            fontSize={16}
            bold
            mt={2}
          >
            View all reviews
          </Text>
        </Pressable>
      </HStack>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="full"
        flex={1}
        avoidKeyboard={true}
        bg={Colors.lightGreen}
      >
        <Modal.Content maxWidth="100%" maxHeight="100vh">
          <Modal.Header>
            <Text fontSize={18} bold>
              All Reviews
            </Text>
          </Modal.Header>
          <Modal.Body h={600}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {ratings &&
                ratings.map((i, index) => (
                  <HStack
                    w="full"
                    borderTopWidth={0.5}
                    borderBottomWidth={0.5}
                    py={2}
                    key={index}
                  >
                    <VStack px={2}>
                      <RatingStar value={i.rating} />
                      <Text fontSize={16}>{i.review}</Text>
                      <Text mt={1} color={Colors.lightBlack} fontSize={12}>
                        By {i.user}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Pressable onPress={() => setShowModal(false)}>
              <Text fontSize={16} bold>
                Close
              </Text>
            </Pressable>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={ratingModal}
        onClose={() => setRatingModal(false)}
        size="full"
        flex={1}
        avoidKeyboard={true}
        bg={Colors.lightGreen}
        style={{ marginBottom: 0, marginTop: "auto" }}
      >
        <Modal.Content maxWidth="100%" maxHeight="100vh">
          <Modal.Body h={600}>
            <Text textAlign="center" fontSize={18} fontWeight="semibold">
              Rating
            </Text>
            <HStack space={1} mt={4} justifyContent="center">
              {[1, 2, 3, 4, 5].map((starValue, index) => (
                <FontAwesome
                  key={index}
                  onPress={() => handleRatingChange(starValue)}
                  name={
                    value >= starValue
                      ? "star"
                      : value >= starValue - 0.5
                      ? "star-half-empty"
                      : "star-o"
                  }
                  size={30}
                  color="#f6b022"
                />
              ))}
            </HStack>
            <Text textAlign="center" mt={6} fontSize={18} fontWeight="semibold">
              Write Product Review
            </Text>
            <TextArea
              onChangeText={(value) => setReview(value)}
              h={40}
              w="full"
              mt={1}
            />
            <Button
              mt={4}
              bg={Colors.green}
              _text={{ fontWeight: "bold", fontSize: "16px" }}
              _pressed={{ bg: Colors.main }}
              onPress={() => handleSubmit()}
            >
              {loading ? (
                <Spinner size="sm" color={Colors.white} />
              ) : (
                "Submit Review"
              )}
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Pressable onPress={() => setRatingModal(false)}>
              <Text fontSize={16} bold>
                Close
              </Text>
            </Pressable>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
