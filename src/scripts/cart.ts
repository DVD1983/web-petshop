export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CART_KEY = 'milo-cart';
const WHATSAPP_NUMBER = '5491131628169';

function getCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function addToCart(productId: string, name: string, price: number, image: string, quantity: number = 1): void {
  const cart = getCart();
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, name, price, quantity, image });
  }
  saveCart(cart);
}

export function removeFromCart(productId: string): void {
  const cart = getCart().filter(item => item.productId !== productId);
  saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  const item = cart.find(i => i.productId === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: [] }));
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString('es-AR')}`;
}

export function getWhatsAppMessage(): string {
  const cart = getCart();
  if (cart.length === 0) return '';

  let message = '🛒 *Pedido Milo Pet Shop*%0A%0A';
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}%0A`;
  });
  message += `%0A*Total: ${formatPrice(getCartTotal())}*%0A%0A`;
  message += `*Datos del cliente:*%0ANombre: (completar)%0ADirección: (completar)`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function openWhatsAppCart(): void {
  const url = getWhatsAppMessage();
  if (url) {
    window.open(url, '_blank');
  }
}

export function getCartItems(): CartItem[] {
  return getCart();
}
