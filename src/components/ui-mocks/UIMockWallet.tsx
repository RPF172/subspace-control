import { ArrowDownLeft, ArrowUpRight, CreditCard, Lock, TrendingUp } from "lucide-react";

export const UIMockWallet = () => {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-medium text-foreground">Creator Vault</div>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            <span>+12.4%</span>
          </div>
        </div>

        {/* Balance */}
        <div className="text-center mb-6">
          <div className="text-xs text-foreground-muted mb-1">Available Balance</div>
          <div className="text-3xl font-semibold text-foreground">$2,847.50</div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <button className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2">
            <ArrowUpRight className="w-4 h-4" />
            Withdraw
          </button>
          <button className="flex-1 py-2.5 rounded-lg bg-background-elevated border border-border text-foreground text-sm font-medium flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" />
            Manage
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-background-elevated border border-border">
            <div className="text-xs text-foreground-muted mb-1">Subscribers</div>
            <div className="text-lg font-medium text-foreground">147</div>
          </div>
          <div className="p-3 rounded-lg bg-background-elevated border border-border">
            <div className="text-xs text-foreground-muted mb-1">This month</div>
            <div className="text-lg font-medium text-foreground">$892.00</div>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <div className="text-xs font-medium text-foreground-secondary uppercase tracking-wider mb-3">Recent Activity</div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-background-elevated border border-border">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4 text-success" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-foreground">Subscription</div>
                <div className="text-xs text-foreground-muted">From @user_xxx</div>
              </div>
              <div className="text-sm font-medium text-success">+$15.00</div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-background-elevated border border-border">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <Lock className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-foreground">Vault unlock</div>
                <div className="text-xs text-foreground-muted">Content access</div>
              </div>
              <div className="text-sm font-medium text-success">+$25.00</div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-background-elevated border border-border">
              <div className="w-8 h-8 rounded-full bg-foreground-muted/20 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-foreground-muted" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-foreground">Withdrawal</div>
                <div className="text-xs text-foreground-muted">To bank •••• 4242</div>
              </div>
              <div className="text-sm font-medium text-foreground-secondary">-$500.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
