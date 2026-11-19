import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { BLOCKCHAIN } from '@/packages/constants'

type Props = {
  blockchains: BLOCKCHAIN[]
  expandedChain: string | null
  onToggleChain: (name: string | null) => void
  onSelectCoin: (chainId: number, coin: string) => void
}

export default function PaymentMethodPicker({
  blockchains,
  expandedChain,
  onToggleChain,
  onSelectCoin,
}: Props) {
  return (
    <div className="space-y-4">
      {blockchains.map((chain) => {
        const isExpanded = expandedChain === chain.name
        return (
          <Card key={chain.name} className="overflow-hidden">
            <button
              type="button"
              className="w-full p-5 flex items-center justify-between cursor-pointer hover:bg-muted/50 text-left"
              aria-expanded={isExpanded}
              onClick={() => onToggleChain(isExpanded ? null : chain.name)}
            >
              <div className="flex items-center gap-4">
                <div className="text-xl font-bold">{chain.name}</div>
                <p className="text-muted-foreground">{chain.desc}</p>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {isExpanded && (
              <div className="p-5 pt-0 grid grid-cols-2 gap-3">
                {chain.coins.map((coin) => (
                  <Button
                    key={coin.name}
                    variant="outline"
                    className="h-20 justify-start gap-4"
                    onClick={() => onSelectCoin(coin.chainId, coin.name)}
                  >
                    <Image src={coin.icon} alt={coin.name} width={40} height={40} />
                    <div className="text-left">
                      <p className="font-semibold">{coin.name}</p>
                      <p className="text-xs text-muted-foreground">Network: {chain.name}</p>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
