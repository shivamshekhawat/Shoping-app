"use client"

import type React from "react"

import Image from "next/image"
import type { CartItem as CartItemType } from "@/types/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { Separator } from "@/components/ui/separator"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      updateQuantity(item.id, value)
    }
  }

  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    }
  }

  return (
    <div>
      <div className="flex gap-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-md border">
          <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-contain p-2" />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="grid gap-1">
            <h3 className="font-medium line-clamp-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{item.category}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={decrementQuantity}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                type="number"
                min="1"
                className="h-8 w-14 text-center"
                value={item.quantity}
                onChange={handleQuantityChange}
              />
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={incrementQuantity}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
                onClick={() => removeFromCart(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-4" />
    </div>
  )
}

