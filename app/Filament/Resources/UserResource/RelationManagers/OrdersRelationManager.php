<?php

namespace App\Filament\Resources\UserResource\RelationManagers;

use App\Filament\Resources\OrderResource;
use App\Filament\Resources\UserResource;
use App\Models\City;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrdersRelationManager extends RelationManager
{
    protected static string $relationship = 'orders';

    protected static ?string $recordTitleAttribute = 'uuid';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('uuid')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->searchable(),
                Tables\Columns\TextColumn::make('uuid')
                    ->searchable()
                    ->url(
                        fn (Order $record) => OrderResource::getUrl('edit', ['record' => $record])
                    )
                    ->label('UUID'),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'danger' => 'pending',
                        'warning' => fn ($state) => in_array($state, ['approved', 'process']),
                        'success' => fn ($state) => in_array($state, ['shipping', 'completed']),
                    ]),
                Tables\Columns\TextColumn::make('city.title'),
                Tables\Columns\TextColumn::make('total_without_tax')
                    ->sortable()
                    ->money('usd'),
                Tables\Columns\TextColumn::make('total')
                    ->sortable()
                    ->color('red')
                    ->money('usd'),
                Tables\Columns\TextColumn::make('created_at')
                    ->sortable()
                    ->date($format = 'd/m/Y H:i'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')
                            ->placeholder(fn ($state): string => 'Dec 18, ' . now()->subYear()->format('Y')),
                        Forms\Components\DatePicker::make('created_until')
                            ->placeholder(fn ($state): string => now()->format('M d, Y')),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];
                        if ($data['created_from'] ?? null) {
                            $indicators['created_from'] = 'Order from ' . Carbon::parse($data['created_from'])->toFormattedDateString();
                        }
                        if ($data['created_until'] ?? null) {
                            $indicators['created_until'] = 'Order until ' . Carbon::parse($data['created_until'])->toFormattedDateString();
                        }

                        return $indicators;
                    }),
                Tables\Filters\Filter::make('status')
                    ->form([
                        Forms\Components\Select::make('status')
                            ->options(Order::$ORDERS_STATUSES)
                            ->searchable(),
                    ])
                    ->query(function (Builder $query, array $data) {
                        if (isset($data['status'])) {
                            $query->where('status', $data['status']);
                        }
                    }),
                Tables\Filters\Filter::make('city_id')
                    ->form([
                        Forms\Components\Select::make('city_id')
                            ->label('City')
                            ->searchable()
                            ->options(City::query()->pluck('title', 'id')),
                    ])
                    ->query(function (Builder $query, array $data) {
                        if (isset($data['city_id'])) {
                            $query->where('city_id', $data['city_id']);
                        }
                    }),
            ])
            ->headerActions([
//                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->label('Edit')
                    ->url(
                        fn (Order $record) => OrderResource::getUrl('edit', ['record' => $record])
                    ),
//                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    protected function getTableContentFooter(): ?View
    {
        return view('filament/orders/footer');
    }
}
