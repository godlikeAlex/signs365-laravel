<?php

class Addon
{
  private $eloquentModel;
  public $type;
  public $condition;
  public $sqft;

  public $total = 0;

  public function __construct($addon, $sqft = 1)
  {
    $this->eloquentModel = $addon;

    $this->type = $this->eloquentModel->type;
    $this->condition = $this->eloquentModel->condition;
    $this->sqft = $sqft;
  }

  public function calculate()
  {
    switch ($this->type) {
      case "FEE":
        $this->calculateSQFT();
        break;
      case "SQFT":
        break;
    }

    return $this->total;
  }

  private function calculateSQFT()
  {
    $this->total + 25;
  }
}
