import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import stripePromise from "../../Config/stripeConfig";
import CheckoutForm from "../../components/Stripe/CheckoutForm";
import { api } from "../../services/api";
import { useCart } from "../../hooks/CartContext";

export function Checkout() {
  const navigate = useNavigate();
  const { cartProducts } = useCart();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function createPaymentIntent() {
      try {
        const products = cartProducts.map(({ id, quantity, price }) => ({ id, quantity, price }));
        const response = await api.post("/create-payment-intent", { products });

        if (response.data?.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          throw new Error("Client secret não retornado.");
        }
      } catch (err) {
        console.error("Erro ao criar PaymentIntent:", err);
        navigate("/carrinho", {
          state: { error: "Erro ao iniciar o pagamento. Tente novamente." },
        });
      } finally {
        setLoading(false);
      }
    }

    createPaymentIntent();
  }, [navigate]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!clientSecret) {
    return (
      <div>
        <h2>Erro ao iniciar o checkout</h2>
        <p>Ocorreu um problema ao obter as informações de pagamento.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    );
  }

  return null;
}
