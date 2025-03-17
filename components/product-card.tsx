"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/types/product"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = () => {
    setIsLoading(true)

    // Simulate network delay
    setTimeout(() => {
      addToCart(product)
      setIsLoading(false)

      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      })
    }, 500)
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative pt-4 px-4 flex items-center justify-center h-[200px]">
        <Badge className="absolute top-2 right-2 z-10">{product.category}</Badge>
        <div className="relative h-[160px] w-full">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <CardContent className="flex-grow py-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating.rate}</span>
          <span className="text-sm text-muted-foreground">({product.rating.count} reviews)</span>
        </div>
        <h3 className="font-semibold line-clamp-1 mb-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        <div className="font-bold">${product.price.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" onClick={handleAddToCart} disabled={isLoading}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

