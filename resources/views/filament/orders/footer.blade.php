<td colspan="5" class="px-4 py-3 filament-tables-text-column">
    Total:
</td>

<td class="filament-tables-cell">
    <div class="px-4 py-3 filament-tables-text-column">
        {{ money($this->getTableRecords()->sum('total_without_tax')) }}
    </div>
</td>

<td class="filament-tables-cell">
    <div class="px-4 py-3 filament-tables-text-column">
        {{ money($this->getTableRecords()->sum('total')) }}
    </div>
</td>

<td class="filament-tables-cell" colspan="2">
    <div class="px-4 py-3 filament-tables-text-column" style="color: #ef4444; font-size: 12px">
        Taxes: {{ money($this->getTableRecords()->sum('total') - $this->getTableRecords()->sum('total_without_tax')) }}
    </div>
</td>
