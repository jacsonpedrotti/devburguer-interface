import React from "react";
import { useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const { cartProducts, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error("Stripe não inicializado.");
      setLoading(false);
      return;
    }

    if (!cpf || cpf.length < 11) {
      toast.error("CPF é obrigatório.");
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: "Cliente",
            email: "cliente@email.com",
            phone: "",
            address: {
              country: "BR"
            }
          }
        }
      },
      redirect: "if_required"
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        const products = cartProducts.map(({ id, quantity, price }) => ({ id, quantity, price }));
        const response = await api.post("/orders", { products });

        if (response.status === 201 || response.status === 200) {
          toast.success("Pagamento confirmado e pedido criado!");
          setTimeout(() => {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,);

          }, 1500);
          clearCart();
        } else {
          toast.error("Erro ao criar pedido.");
        }
      } catch {
        toast.error("Erro no servidor ao criar pedido.");
      }
    } else {
      toast.error("Pagamento não foi concluído.");
    }

    setLoading(false);
  }

  const formatCPF = (value) => {
    const cpf = value.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  return (
    <div className="checkout-container">
      <form onSubmit={handleSubmit} className="checkout-form">
        <PaymentElement options={{
          paymentMethodOrder: ['card', 'pix'],
          paymentMethodTypes: ['card', 'pix']
        }} />

        <div className="cpf-field">
          <label htmlFor="cpf">CPF *</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={handleCPFChange}
            placeholder="000.000.000-00"
            maxLength="14"
            required
            className="cpf-input"
          />
        </div>

        <AddressElement options={{
          mode: 'billing',
          allowedCountries: ['BR'],
          defaultValues: {
            country: 'BR'
          },
          fields: {
            phone: 'always',
            name: 'always'
          }
        }} />

        <button disabled={!stripe || loading} type="submit" className="button">
          {loading ? "Processando..." : "Pagar"}
        </button>
      </form>
    </div>
  );
}
